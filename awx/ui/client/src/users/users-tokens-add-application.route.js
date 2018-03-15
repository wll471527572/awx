export default {
    name: 'users.edit.tokens.add.application',
    url: '/application?selected',
    searchPrefix: 'application',
    params: {
        application_search: {
            value: {
                page_size: 5,
                order_by: 'name'
            },
            dynamic: true,
            squash: ''
        }
    },
    data: {
        basePath: 'applications',
        formChildState: true
    },
    ncyBreadcrumb: {
        skip: true
    },
    views: {
        'application@users.edit.tokens.add': {
            templateProvider: (ListDefinition, generateList) => {
                const html = generateList.build({
                    mode: 'lookup',
                    list: ListDefinition,
                    input_type: 'radio'
                });

                return `<lookup-modal>${html}</lookup-modal>`;
            }
        }
    },
    resolve: {
        ListDefinition: [() => {
            return {
                name: 'applications',
                iterator: 'application',
                hover: true,
                index: false,
                fields: {
                    name: {
                        key: true,
                        label: 'Name',
                        columnClass: 'col-lg-4 col-md-6 col-sm-8 col-xs-8',
                        awToolTip: '{{application.description | sanitize}}',
                        dataPlacement: 'top'
                    },
                },
                actions: {
                },
                fieldActions: {
                }
            }
        }],
        Dataset: ['QuerySet', 'GetBasePath', '$stateParams', 'ListDefinition',
            (qs, GetBasePath, $stateParams, list) => qs.search(
                GetBasePath('applications'),
                $stateParams[`${list.iterator}_search`]
            )
        ]
    },
    onExit ($state) {
        if ($state.transition) {
            $('#form-modal').modal('hide');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
        }
    }
}
