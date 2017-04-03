#![feature(link_args)]

#[link_args = "-s EXPOSED_FUNCTION=['_quick_sort']"]
extern { }

fn main() { }

#[no_mangle]
pub extern fn quick_sort() {
    println!("Hello, world!");

    let ptr = 0 as *mut u32;

    for i in 0..1000 {
        unsafe { *ptr.offset(i) = i as u32; }
    }
}
