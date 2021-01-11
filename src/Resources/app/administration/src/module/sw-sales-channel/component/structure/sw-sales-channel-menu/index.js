import template from './sw-sales-channel-menu.html.twig'
const { Criteria } = Shopware.Data;

Shopware.Component.override('sw-sales-channel-menu', {
    template,

    data() {
        return {
            salesChannels: [],
            menuItems: [],
            showModal: false,
            searchTerm: ''
        };
    },

    methods: {
        onSearchTermChange() {
            this.loadEntityData();
        },

        loadEntityData() {
            const criteria = new Criteria();

            if (this.searchTerm.trim().length) {
                criteria.addFilter(Criteria.contains('sales_channel.name', this.searchTerm.trim()));
            }

            criteria.setPage(1);
            criteria.setLimit(500);
            criteria.addSorting(Criteria.sort('sales_channel.name', 'ASC'));
            criteria.addAssociation('type');

            this.salesChannelRepository.search(criteria, Shopware.Context.api).then((response) => {
                this.salesChannels = response;
                this.createMenuTree();
            });
        },
    },
});
