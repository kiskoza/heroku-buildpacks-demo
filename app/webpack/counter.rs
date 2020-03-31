use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Counter {
  count: u32,
}

#[wasm_bindgen]
impl Counter {
  pub fn new() -> Counter {
    Counter {
      count: 0
    }
  }

  pub fn increment(&mut self) {
    self.count = self.count + 1;
  }

  pub fn count(&self) -> u32 {
    self.count
  }
}
