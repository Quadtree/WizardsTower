let badGuys = {};

function turn(turnNumber){
    for (let p of PARTICIPANTS){
        if (badGuys[p.name]) continue;
        if (p.charClass == "WIZARD") continue;
        if (p.hp <= 0) continue;

        for (let scle of p.spellCastLog){
            let theSpell = SPELLS[scle.spellName];
            if (theSpell.damage > 0 && (!badGuys[scle.target] || theSpell.targetMode == "ALL")){
                badGuys[p.name] = true;
                break;
            }
        }
    }

    let currentTarget = null;

    for (let k in badGuys){
        if (PARTICIPANT_MAP[k].hp > 0){
            currentTarget = k;
            break;
        }
    }

    if (currentTarget){
        return {
            spell: "Flame Arrow",
            target: currentTarget
        };
    } else {
        return {
            spell: "Heal",
            target: ME.name
        }
    }
}