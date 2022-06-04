class Tweets {
    neuron = 'bostrom1ndwqfv2skglrmsqu4wlneepthyrquf9r7sx6r0'
    particleFrom = 'QmbdH2WBamyKLPE5zu4mJ9v49qvY8BFfoumoVPMR5V4Rvx'
    limit = 1000000000
    loadURL = `https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${this.neuron}&cyberlink.particleFrom=${this.particleFrom}&limit=${this.limit}`
    loadData = []
    tweets = []
    node = {}

    get all() {
        return (async () => {
            await this.parseTweets()
            return this.tweets
        })()
    }

    async loadTweets() {
        await fetch(this.loadURL)
            .then(response => response.json())
            .then(data => this.loadData = data.txs.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)))

        this.node = await Ipfs.create({
            repo: String(Math.random() + Date.now()),
        })
    }

    async parseTweets() {
        await this.loadTweets()

        for (const el of this.loadData) {
            for await (const data of this.node.cat(el.tx.value.msg[0].value.links[0].to)) {
                console.log(data.toString())
            }


            // await fetch('https://ipfs.io/ipfs/' + el.tx.value.msg[0].value.links[0].to)
            //     .then(response => response.text())
            //     .then(data => this.tweets.push(data))
        }
    }
}