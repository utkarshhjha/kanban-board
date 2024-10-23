import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const statusIcons = {
    'Todo': '/icons/icontodo.svg',
    'In progress': '/icons/in-progress.svg',
    'Backlog': '/icons/Backlog.svg',
};

const priorityIcons = {
    4: '/icons/SVG - Urgent Priority colour.svg',
    3: '/icons/Img - High Priority.svg',
    2: '/icons/Img - Medium Priority.svg',
    1: '/icons/Img - Low Priority.svg',
    0: '/icons/No-priority.svg'
};

const plusIcon = '/icons/add.svg';
const threeDotsIcon = '/icons/3 dot menu.svg';

const KanbanBoard = ({ tickets, users, groupBy }) => {
    const groupedTickets = {};

    const userMap = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
    }, {});

    if (groupBy === 'status') {
        tickets.forEach(ticket => {
            if (!groupedTickets[ticket.status]) {
                groupedTickets[ticket.status] = [];
            }
            groupedTickets[ticket.status].push(ticket);
        });
    } else if (groupBy === 'priority') {
        tickets.forEach(ticket => {

            const priorityLevel = ticket.priority;
            const priorityLabel =
                priorityLevel === 4 ? 'Urgent' :
                    priorityLevel === 3 ? 'High' :
                        priorityLevel === 2 ? 'Medium' :
                            priorityLevel === 1 ? 'Low' : 'No Priority';

            if (!groupedTickets[priorityLevel]) {
                groupedTickets[priorityLevel] = {
                    label: priorityLabel,
                    tickets: []
                };
            }
            groupedTickets[priorityLevel].tickets.push(ticket);
        });
    } else if (groupBy === 'user') {
        tickets.forEach(ticket => {
            const userName = userMap[ticket.userId];
            if (!groupedTickets[userName]) {
                groupedTickets[userName] = [];
            }
            groupedTickets[userName].push(ticket);
        });
    }

    return (
        <div className="kanban-board">
            {Object.keys(groupedTickets).map(group => (
                <div key={group} className="kanban-column">
                    <h3 className="kanban-column-heading">
                        <div className="kanban-column-heading-1">
                            {groupBy === 'status' && (
                                <>
                                    <img src={statusIcons[group]} alt={group} className="group-icon" />
                                    {group}({groupedTickets[group].length})
                                </>
                            )}
                            {groupBy === 'priority' && (
                                <>
                                    <img src={priorityIcons[group]} alt={group} className="group-icon" />
                                    {groupedTickets[group].label}
                                    ({groupedTickets[group].tickets.length})
                                </>
                            )}
                            {groupBy === 'user' && (
                                <>
                                    {group}({groupedTickets[group].length})
                                </>
                            )}
                        </div>
                        <div className="kanban-column-heading-2">
                            <img src={plusIcon} alt="Add" className="action-icon" />
                            <img src={threeDotsIcon} alt="Menu" className="action-icon" />
                        </div>
                    </h3>
                    {groupBy === 'priority'
                        ? groupedTickets[group].tickets.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                        : groupedTickets[group].map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                    }
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;