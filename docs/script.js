new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            loading: true,
            errored: false
        };
    },
    filters: {
        currencydecimal(value) {
            return value.toFixed(2);
        }
    },
    mounted() {
        axios({
            method: 'post',
//            contentType: 'application/x-www-form-urlencoded',
            url: 'https://api.admitad.com/token/',
            data: 'code=87eaa2f4587345bad56c99ccdd71cb&client_secret=202aa3513778f233c63bd5c572e889&grant_type=authorization_code&client_id=a3205734413fcbef29ee6f18945716&redirect_uri=https%3A%2F%2Fgoogle.com%2F'
//                    {
//                grant_type: 'client_credentials',
//                client_id: 'a3205734413fcbef29ee6f18945716',
//                scope: 'advcampaigns banners websites'
            ,
            config: {
                headers: {
                    'Authorization': 'Basic YTMyMDU3MzQ0MTNmY2JlZjI5ZWU2ZjE4OTQ1NzE2OjIwMmFhMzUxMzc3OGYyMzNjNjNiZDVjNTcyZTg4OQ==',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        }).then(response => {
            this.info = response;
        }).catch(error => {
            console.log(error);
            this.errored = true;
        }).finally(() => (this.loading = false));
    }
});