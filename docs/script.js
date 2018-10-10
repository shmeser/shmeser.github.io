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
            contentType: 'application/x-www-form-urlencoded',
            url: 'https://api.admitad.com/token/',
            data: 'grant_type=client_credentials&client_id=cb281d918a37e346b45e9aea1c6eb7&scope=advcampaigns banners websites'
//                    {
//                grant_type: 'client_credentials',
//                client_id: 'cb281d918a37e346b45e9aea1c6eb7',
//                scope: 'advcampaigns banners websites'
//            }
            ,
            config: {headers: {'Authorization': 'Basic YTMyMDU3MzQ0MTNmY2JlZjI5ZWU2ZjE4OTQ1NzE2OjIwMmFhMzUxMzc3OGYyMzNjNjNiZDVjNTcyZTg4OQ=='}}
        }).then(response => {
            this.info = response;
        }).catch(error => {
            console.log(error);
            this.errored = true;
        }).finally(() => (this.loading = false));
    }
});