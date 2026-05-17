from app.database import db
from app.model import Task

def list_tasks(status=None):
    query = Task.query.order_by(Task.created_at.desc())
    if status:
        query = query.filter_by(status=status)
    return [t.to_dict() for t in query.all()]


def create_task(data):
    title = data.get('title')
    if not title:
        raise ValueError('title is required')
    task = Task(
        title=title,
        description=data.get('description'),
        priority=data.get('priority', 'normal'),
        status=data.get('status', 'pending'),
    )
    db.session.add(task)
    db.session.commit()
    return task.to_dict()


def get_task_by_id(task_id):
    return Task.query.get(task_id)


def update_task(task_id, data):
    task = get_task_by_id(task_id)
    if not task:
        return None
    for field in ('title', 'description', 'priority', 'status'):
        if field in data:
            setattr(task, field, data[field])
    db.session.commit()
    return task.to_dict()


def delete_task(task_id):
    task = get_task_by_id(task_id)
    if not task:
        return False
    db.session.delete(task)
    db.session.commit()
    return True
