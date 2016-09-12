
function turn(me, participants, turnNumber){
    let potentialTargets = [];

    if (Math.random() < GENES[0] * 0.4) return {};

    for (let p of participants){
        if (p.name == me.name) continue;
        if (p.hp <= 0) continue;

        potentialTargets.push(p.name);
    }
    if (potentialTargets.length > 0){
        return {
            spell: "Flame Arrow",
            target: potentialTargets[Math.floor(Math.random() * potentialTargets.length)]
        };
    }

    return {};
}