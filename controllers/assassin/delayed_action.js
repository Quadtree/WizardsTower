let wizardsName = null;

function turn(turnNumber){
    if (turnNumber < 20){
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

        // if we found no targets, then just attack anyone not the wizard randomly
        if (attackedTheWizard.length == 0){
            for (let p of PARTICIPANTS){
                if (p.name == wizardsName || p.name == ME.name || p.hp <= 0) continue;
                attackedTheWizard.push(p);
            }
        }

        if (attackedTheWizard.length > 0){
            attackedTheWizard.sort(function(a, b){
                return a.hp - b.hp;
            });

            let target = attackedTheWizard[0];

            return {
                spell: "Flame Arrow",
                target: target
            };
        } else {
            return {};
        }
    } else {
        return {
            spell: "Flame Arrow",
            target: wizardsName
        };
    }
}