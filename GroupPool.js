"use strict";

class GroupPool
{
    constructor(subPools){
        this.subPools = subPools;
    }

    cull(numLeft){
        for (let pool of this.subPools){
            pool.cull(numLeft);
        }
    }

    grow(toSize){
        for (let pool of this.subPools){
            pool.grow(toSize);
        }
    }

    select(){
        let n = 0;
        let retPool = null;

        for (let pool of this.subPools){
            if (Math.floor(Math.random() * ++n) == 0){
                retPool = pool;
            }
        }

        return retPool.select();
    }

    getAll(){
        let ret = [];

        for (let pool of this.subPools){
            for (let ct of pool.getAll()){
                ret.push(ct);
            }
        }

        return ret;
    }
}

module.exports = GroupPool;