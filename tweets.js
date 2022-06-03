class Tweets {
    loadData = []
    tweets = []

    get all() {
        return (async () => {
            await this.parseTweets()
            return this.tweets
        })()
    }

    async loadTweets() {
        await fetch('https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=bostrom1ndwqfv2skglrmsqu4wlneepthyrquf9r7sx6r0&cyberlink.particleFrom=QmbdH2WBamyKLPE5zu4mJ9v49qvY8BFfoumoVPMR5V4Rvx&limit=1000000000')
            .then(response => response.json())
            .then(data => this.loadData = data.txs.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)))
    }

    async parseTweets() {
        await this.loadTweets()

        for (const el of this.loadData) {
            await fetch('https://ipfs.io/ipfs/' + el.tx.value.msg[0].value.links[0].to)
                .then(response => response.text())
                .then(data => this.tweets.push(data))
        }
    }
}