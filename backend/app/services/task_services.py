from app.database import db
from app.models.task import Task
from sqlalchemy import or_

def list_tasks(user_id, status=None, q=None):
    query = Task.query.filter_by(user_id=user_id).order_by(Task.created_at.desc())
    if status:
        query = query.filter_by(status=status)
    if q:
        pattern = f"%{q}%"
        query = query.filter(or_(Task.title.ilike(pattern), Task.description.ilike(pattern)))
    return [t.to_dict() for t in query.all()]

def create_task(data, user_id):
    title = data.get('title')
    if not title:
        raise ValueError('title is required')
    task = Task(
        title=title,
        description=data.get('description'),
        priority=data.get('priority', 'normal'),
        status=data.get('status', 'pending'),
        user_id=user_id,
    )
    db.session.add(task)
    db.session.commit()
    return task.to_dict()

def get_task_by_id(task_id, user_id):
    return Task.query.filter_by(id=task_id, user_id=user_id).first()

def update_task(task_id, data, user_id):
    task = get_task_by_id(task_id, user_id)
    if not task:
        return None
    for field in ('title', 'description', 'priority', 'status'):
        if field in data:
            setattr(task, field, data[field])
    db.session.commit()
    return task.to_dict()

def delete_task(task_id, user_id):
    task = get_task_by_id(task_id, user_id)
    if not task:
        return False
    db.session.delete(task)
    db.session.commit()
    return True
