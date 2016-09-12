"use strict";

const ControllerType = require("./ControllerType.js");

class Pool
{
    constructor(initialMembers){
        this.members = initialMembers;
    }

    cull(numLeft){
        this.members.sort(function(a,b){
            return b.wins - a.wins;
        });

        this.members = this.members.slice(0, numLeft);
    }

    grow(toSize){
        if (this.members.length == 0) throw "Pool is empty, cannot grow";

        while(this.members.length < toSize){
            if (this.members.length == 1) this.members.push(new ControllerType(this.members[0].file, this.members[0].charClass, this.members[0].team, this.members[0].genes));
        
            let parent1 = this.members[0];
            let parent2 = this.members[0];

            while(parent1 == parent2){
                parent1 = this.members[Math.floor(Math.random() * this.members.length)];
                parent2 = this.members[Math.floor(Math.random() * this.members.length)];
            }

            let genes = [];

            for (let i=0;i<parent1.genes.length;++i){
                genes.push((parent1.genes[i] + parent2.genes[i])/2);
            }

            this.members.push(new ControllerType(
                Math.random() < 0.5 ? parent1.file : parent2.file,
                Math.random() < 0.5 ? parent1.charClass : parent2.charClass,
                Math.random() < 0.5 ? parent1.team : parent2.team,
                genes
            ));
        }
    }

    select(){
        return this.members[Math.floor(Math.random() * this.members.length)];
    }

    getAll(){
        return this.members;
    }
}

module.exports = Pool;