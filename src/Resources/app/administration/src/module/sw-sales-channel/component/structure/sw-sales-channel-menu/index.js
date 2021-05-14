import template from './sw-sales-channel-menu.html.twig'
const { Criteria } = Shopware.Data;

Shopware.Component.override('sw-sales-channel-menu', {
    template,

    data() {
        return {
            salesChannels: [],
            showModal: false,
            searchTerm: ''
        };
    },
    computed: {
        salesChannelCriteria() {
            const criteria = new Criteria();

            criteria.addSorting(Criteria.sort('sales_channel.name', 'ASC'));
            criteria.addAssociation('type');
            criteria.addAssociation('domains');

            if (this.searchTerm.trim().length) {
                criteria.addFilter(Criteria.contains('sales_channel.name', this.searchTerm.trim()));
            }

            return criteria;
        },
    },

    methods: {
        onSearchTermChange() {
            this.loadEntityData();
        },
    },
});
