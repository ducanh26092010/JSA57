// khai bao 
const obj = []
console.log(obj)
// them thuoc tinh moi
obj.a = 10;
console.log(obj)


class Animal{
    constructor() {
        this.$name = name;
        this.$speak = "abc";
    }
}
// tao obj
const obj1 = new Animal("mno");
console.log(obj1);

// duyet obj (for in)
for(let key in obj1) {
    console.log(key, obj1[key])
}


// toan tu in -> return bool
console.log("a" in obj); // ktra key a co ton tai trong obj ko

// ham hasOwnProperty -> return bool
console.log(obj1.hasOwnProperty("$gender")? "co" : "khong"); // false (ko)



// xoa key
obj2 = {...obj, gender: 0}
console.log(obj2); 

// toan tu rest
const {$name: animalName, ... otherInfo} = obj2;
console.log(animalName);
console.log(otherInfo);

// KIEM TRA LOAI
console.log(typeof []); // obj -x arr
console.log(Array.isArray([])); // true

console.log(typeof {}); // obj
