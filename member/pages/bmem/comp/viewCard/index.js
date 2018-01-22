let we = require('../../../../we/index.js')

new class extends we.Page {
    data() {
      
      
        return {
          imgUrls: [
            '/assets/images/tu.png',
            '/assets/images/tu.png',
            '/assets/images/tu.png'

          ],
          indicatorDots: true,
      interval: 5000,
        duration: 100
        }
    }
}
