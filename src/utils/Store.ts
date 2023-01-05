export interface Store {
  set: (key: string, value: any) => void
}

class SimpleStore implements Store {
  constructor(){

  }
  set(key: string, value: any){

  };
}

export const simpleStore = new SimpleStore();
