define(
    [
        'react',
        'jsx!React/Components/Groups/Group'
    ],
    function (
        React,
        Group
    ) {
        var MenuGroupsPanel = React.createClass({

            propTypes: {
                groups: React.PropTypes.array.isRequired
            },

            render: function () {
                return (
                    <div>
                        {this.renderGroups()}
                    </div>
                );
            },

            renderGroups: function () {
                return this.props.groups.map(function (group, i) {
                    return (
                        <Group group={group} key={i} />
                    );
                })
            }
        });

        return MenuGroupsPanel;
    });