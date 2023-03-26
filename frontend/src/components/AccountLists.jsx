import ModalButton from './modal/Modal';

const AccountLists = ({data}) => {
    return (
        <section className="account__lists">
            <h3>Списки литературы</h3>
            <h4>Все списки литературы</h4>
            {data.lists.length === 0 ? <h4>Списков пока нет</h4> :
            data.lists.map((list) => {
                if (list.list.length === 0) return;
                return ( 
                    <ModalButton key={list.list_id} settings={{
                        buttonSettings: {
                            buttonClassName: 'account__button',
                            text: `${list.list[0].reference} .....`,
                            icon: ''
                        },
                        contentSettings: {
                            title: 'Список литературы', 
                            content: function Content() {
                                const items = list.list.map((item) => {
                                    return <li key={item.id}>{item.reference}</li>;
                                });
                                return <ol>{items}</ol>;
                            },
                            buttons: [{
                                text: 'Скопировать',
                                action: () => {
                                    const references = list.list.map(item => item.reference);
                                    navigator.clipboard.writeText(references.join('\n'));
                                }
                            }]
                        }
                    }} />
                )
            })}
        </section>
    )
};
export default AccountLists;