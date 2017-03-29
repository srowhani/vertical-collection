import Ember from 'ember';
import getNumbers from 'dummy/lib/get-numbers';

const {
  Controller
} = Ember;

export default Controller.extend({
  numItemsToRemove: 20,
  numImages: 5,

  someProperty: 50,

  actions: {

    loadAbove() {
      // let first = this.get('model.first');
      // let numbers = getNumbers(first - 20, 20);
      // let model = this.get('model.numbers');
      // model.unshiftObjects(numbers);
      // this.set('model.numbers', newModel);
      // this.set('model.first', first - 20);
    },

    loadBelow() {
      // let last = this.get('model.last');
      // let numbers = getNumbers(last, 20);
      // let model = this.get('model.numbers');
      // model.pushObjects(numbers);
      // this.set('model.numbers', newModel);
      // this.set('model.last', last + 20);
    },
    removeItems() {
      const items = this.get('model.numbers');
      items.splice(0, this.get('numItemsToRemove'));
      this.set('model.numbers', items.slice());
    },
    setMinHeight() {
      this.set('someProperty', 90);
    }
  }

});
