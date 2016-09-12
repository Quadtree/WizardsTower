let wizardsName = null;

function turn(me, participants, turnNumber){
    if (wizardsName === null){
        for (let p of participants){
            if (p.charClass == "WIZARD"){
                wizardsName = p.name;
                break;
            }
        }
    }

    let attackedTheWizard = [];
    let wizardsHP = null;

    for (let p of participants){
        if (p.name == wizardsName){
            wizardsHP = p.hp;
            continue;
        }

        if (p.hp <= 0) continue;

        for (let scle of p.spellCastLog){
            let theSpell = SPELLS[scle.spellName];
            if (!theSpell) throw "Wait, spell " + scle.spellName + " doesn't exist!";
            if (theSpell.damage > 0 && (scle.target == wizardsName || theSpell.targetMode == "ALL")){
                attackedTheWizard.push(p.name);
                break;
            }
        }
    }

    if (attackedTheWizard.length > 0){
        let target = attackedTheWizard[Math.floor(Math.random() * attackedTheWizard.length)];

        return {
            spell: "Flame Arrow",
            target: target
        };
    } else if (wizardsHP < 4){
        return {
            spell: "Heal",
            target: wizardsName
        }
    } else {
        return {
            spell: "Heal",
            target: me.name
        }
    }
}