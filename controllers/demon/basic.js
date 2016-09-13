
function turn(turnNumber){
    let potentialTargets = [];

    for (let p of PARTICIPANTS){
        if (p.name == ME.name) continue;
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