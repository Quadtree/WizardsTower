let wizardsName = null;

function turn(turnNumber){
    let participants = PARTICIPANTS;
    let me = ME;

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

    if (attackedTheWizard.length > 0){// || turnNumber >= 35){
        // someone has attacked the wizard, so let's help!
        let potentialTargets = [];
        let wizardIsAlive = false;

        for (let p of participants){
            if (p.name == me.name) continue;
            if (p.hp <= 0) continue;

            potentialTargets.push(p.name);

            if (p.name == wizardsName && p.hp > 0) wizardIsAlive = true;
        }
        if (wizardIsAlive){
            return {
                spell: "Flame Arrow",
                target: wizardsName,
            };
        } else {
            if (potentialTargets.length > 0){
                return {
                    spell: "Flame Arrow",
                    target: potentialTargets[Math.floor(Math.random() * potentialTargets.length)]
                };
            }
            return {};
        }
    } else {
        return {
            spell: "Heal",
            target: ME.name,
        };
    }
}