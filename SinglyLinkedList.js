// Abstract Data Type - ADT - What is an ADT?
// non-contiguous memory -> not quick -> O(n)
// can add and remove pretty quickly

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(val) {
        // WITHOUT TAIL
        // if (!this.head) return null;
        // let current = this.head;
        // while (current.next) {
        //     current = current.next;
        // }
        // current.next = new Node(val);
        // this.tail = current.next;

        // WITH TAIL
        if (!this.head) {
            this.head = new Node(val);
        } else {
            this.tail.next = new Node(val);
        }
        this.tail = new Node(val);
        this.length++;
        return this;
    }

    pop() {
        if (!this.head) {
            return null;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = null;
            this.tail = current;
            this.length--;
        }
        return this;
    }

    get(index) {
        if (this.length === 0) return null;
        if (index >= this.length) return null;
        if (index === this.length - 1) return this.tail;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    set (index, val) {
        let node = this.get(index);
        if (!node) return null;
        node.val = val;
        if (index === this.length - 1) this.tail.val = val;
        return this;
    }

    remove(val) {
        let current = this.head;
        while (current.next.val !== val && current.next !== null) {
            current = current.next;
        }
        this.length--;
        current.next = current.next.next;
        return `Node with value ${val} not found.`
    }

    reverse() {
        if(!this.head) return null;
        let prev = null;
        let next = null;
        let current = this.head;
        while (current) {
            next = current.next; // save the next.
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
        return prev;
    }

    populate(arr) {
        if (!arr.length) return null;
        if (!this.head) this.head = new Node(arr[0]);
        let current = this.head;
        this.length = 1;
        for (let i = 1; i < arr.length; i++) {
            current.next = new Node(arr[i]);
            this.length++;
            current = current.next;
        }
        this.tail = current;
        return this;
    }
    
    print() {
        if (!this.head) return null;
        let current = this.head;
        let list = '';
        while (current.next) {
            list += `${current.val} -> `
            current = current.next;
        }
        list+= `${current.val}`
        return list;
    }
}

let linkedList = new LinkedList().populate([1,2,4,8]);
linkedList.append(5);
linkedList.remove(4);
console.log(linkedList.print())
console.log(`List length is ${linkedList.length}`);
linkedList.reverse();
console.log(linkedList.print())
console.log(linkedList.get(2)); // node.val = 1
linkedList.set(2, 5)
console.log(linkedList.get(2)) // node.val = 5;

// counter = 3;
// while (counter) counter--;
// console.log(counter) // counter is 0
// while(counter) is the same as while(counter === 0) because counter is coerced to a boolean and 0 is falsey.