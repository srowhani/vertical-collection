import Ember from 'ember';
import getNumbers from 'dummy/lib/get-numbers';

const {
  Controller
} = Ember;

export default Controller.extend({

  numImages: 5,

  someProperty: 50,

  actions: {

    loadAbove() {
      let first = this.get('model.first');
      let numbers = getNumbers(first - 20, 20);
      let model = this.get('model.numbers');
      model.unshiftObjects(numbers);
      // this.set('model.numbers', newModel);
      this.set('model.first', first - 20);
    },

    loadBelow() {
      let last = this.get('model.last');
      let numbers = getNumbers(last, 20);
      let model = this.get('model.numbers');
      model.pushObjects(numbers);
      // this.set('model.numbers', newModel);
      this.set('model.last', last + 20);
    },

    setMinHeight() {
      this.set('someProperty', 90);
    },

    remove(index) {
      const numbers = this.get('model.numbers').slice()
      numbers.splice(index, 5)
      this.set('model.numbers', Ember.A(numbers))
    }
  }

});
