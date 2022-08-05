import crypto from "crypto"

interface BlockShape {
    prevHash:string;
    height:number
    data:string
    hash:string
}

class Block implements BlockShape{
    public hash :string
    constructor(
        public prevHash : string,
        public height : number,
        public data : string
    ) {
        this.hash = Block.calculateHash(prevHash,height,data)
    }

    static calculateHash(prevHash:string, height:number, data:string){
        const toHash =  `${prevHash}${height}${data}`
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }


}


class BlockChain {
    private blocks:Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevBlock() {
        if(this.blocks.length === 0 ) return "";
        return this.blocks[this.blocks.length-1].hash
    }

    public addBlock(data:string){
        const newBlock = new Block(this.getPrevBlock(), this.blocks.length + 1, data)
        this.blocks.push(newBlock)
    }

    public getBlock(){
        // return this.blocks // 이렇게 리턴할경우 배열자체에 접근및 수정이 가능하기 때문에
        return [...this.blocks] // 이런식으로 새로운 배열을 리턴해주는것이 보안상 더 좋다.
    }

}


const block = new BlockChain()

block.addBlock('first one')
block.addBlock('second one')
block.addBlock('third one')
console.log(block.getBlock())