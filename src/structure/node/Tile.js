import Expression from "../Expression";

export default class Tile extends Expression {

  constructor(base, repeats, {name, scope} = {}) {
    super({name, scope});
    this._base = base;
    this._repeats = repeats;
    this._shape = base.shape.slice();
    for (let i = 0; i < repeats.length; i++) {
      this._shape[i] *= repeats[i];
    }
  }

  get base() {
    return this._base;
  }

  get params() {
    return {
      name: this._name,
      base: this.base.id,
      repeats: this._repeats
    }
  }

  get repeats() {
    return this._repeats;
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'Tile';
  }

  accept(visitor, params) {
    visitor.visitTile(this, params);
  }

}