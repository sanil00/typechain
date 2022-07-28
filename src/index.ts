import {init, exit} from "./myPackage"



init({url:"url",id:0})
exit(2)


class Block {
    constructor(
        private data :string){}
        static hello() {
            return "hi"
        }
    
}