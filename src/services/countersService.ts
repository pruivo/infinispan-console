import utils from './utils';
import { Either, left, right } from '@services/either';

/**
 * REST API Calls
 */
class CountersService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Get counters list
   */
  public getCounters(): Promise<Either<ActionResponse, Counter[]>> {
    return utils
      .restCall(this.endpoint + '/counters/', 'GET')
      .then((response) => response.json())
      .then((jsonList) => {
        const counters: Promise<Counter>[] = jsonList.map((name) =>
          this.getCounter(name)
        );
        return Promise.all(counters);
      })
      .then((counters) => right(counters) as Either<ActionResponse, Counter[]>)
      .catch((err) => left(utils.mapError(err, 'Unable to retrieve counters')));
  }

  private getCounter(name: string): Promise<Counter> {
    let counter: Promise<Counter> = utils
      .restCall(this.endpoint + '/counters/' + name, 'GET')
      .then((response) => response.json())
      .then((value) => <Counter>{ name: name, value: value });

    let counterConfig: Promise<CounterConfig> = this.getCounterConfig(name);
    let promises = Promise.all([counter, counterConfig]);

    // combine config into counter
    return promises.then((data) => {
      data[0].config = data[1];
      return data[0];
    });
  }

  private getCounterConfig(name: string): Promise<CounterConfig> {
    return utils
      .restCall(this.endpoint + '/counters/' + name + '/config', 'GET')
      .then((response) => response.json())
      .then((value) => {
        let counterConfig: CounterConfig;
        if (value.hasOwnProperty('weak-counter')) {
          const weakCounter = value['weak-counter'];
          counterConfig = <CounterConfig>{
            name: name,
            type: 'Weak',
            initialValue: weakCounter['initial-value'],
            storage: weakCounter.storage,
            concurrencyLevel: weakCounter['concurrency-level'],
          };
        } else {
          const strongCounter = value['strong-counter'];
          counterConfig = <CounterConfig>{
            name: name,
            type: 'Strong',
            initialValue: strongCounter['initial-value'],
            storage: strongCounter.storage,
            lowerBound: strongCounter['lower-bound'],
            upperBound: strongCounter['upper-bound'],
          };
        }
        return counterConfig;
      });
  }

  /**
   * Delete counter
   *
   * @param name, counter to be deleted
   */
  public delete(name: string): Promise<ActionResponse> {
    return utils.handleCRUDActionResponse(
      'Counter ' + name + ' has been deleted',
      utils.restCall(this.endpoint + '/counters/' + name, 'DELETE')
    );
  }
}

const countersService: CountersService = new CountersService(utils.endpoint());

export default countersService;
