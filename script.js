
class Graph {
    constructor(orientovany = false) {
        this.uzly = [];
        this.hrany = [];
        this.orientovany = orientovany;
    }

    addNode(uzel) {
        if (!this.uzly.includes(uzel)) this.uzly.push(uzel);
    }

    addEdge(od, doU, vaha = null) {
        this.hrany.push({ od, do: doU, vaha });
    }

    chromaticNumber() {
        const barvy = {};
        let pocet = 0;

        for (const uzel of this.uzly) {
            const pouzite = [];

            for (const h of this.hrany) {
                if (h.od === uzel && barvy[h.do] !== undefined)
                    pouzite.push(barvy[h.do]);

                if (h.do === uzel && barvy[h.od] !== undefined)
                    pouzite.push(barvy[h.od]);
            }

            let barva = 0;
            while (pouzite.includes(barva)) barva++;

            barvy[uzel] = barva;
            pocet = Math.max(pocet, barva + 1);
        }

        return pocet;
    }

    
    analyze() {
        const smycky = this.hrany.some(h => h.od === h.do);
        const ohodnoceny = this.hrany.some(h => h.vaha !== null);

        // Eulerova podmínka
        let planarni = true;

        if (this.uzly.length >= 3 &&
            this.hrany.length > 3 * this.uzly.length - 6) {
            planarni = false;
        }

        console.log("Počet uzlů:", this.uzly.length);
        console.log("Počet hran:", this.hrany.length);
        console.log("Orientovaný:", this.orientovany ? "Ano" : "Ne");
        console.log("Ohodnocený:", ohodnoceny ? "Ano" : "Ne");
        console.log("Smyčky:", smycky ? "Ano" : "Ne");
        console.log("Planární:", planarni ? "Pravděpodobně ano" : "Ne");
        console.log("Chromatické číslo:", this.chromaticNumber());
    }
}

const graf = new Graph(false);

graf.addNode("A");
graf.addNode("B");
graf.addNode("C");
graf.addNode("D");

graf.addEdge("A", "B");
graf.addEdge("B", "C");
graf.addEdge("C", "A");
graf.addEdge("C", "D", 5);

graf.analyze();
