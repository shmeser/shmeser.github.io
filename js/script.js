new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            offers: [],
            loading: true,
            errored: false
        };
    },
    methods: {
    },
    filters: {
        currencydecimal(value) {
            return value.toFixed(2);
        }
    },
    mounted() {
        axios({
            method: "GET",
            url: 'file_curl.txt',
        }).then(response => {
            this.info = response.data.results[0];
            this.offers = response.data.results;
        }).catch(error => {
            console.log(error);
            this.errored = true;
        }).finally(() => (this.loading = false));
    }
});