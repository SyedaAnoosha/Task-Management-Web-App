from flask import Blueprint

from .controllers import (
    get_tasks_controller,
    create_task_controller,
    update_task_controller,
    delete_task_controller,
)

bp = Blueprint('api', __name__)

@bp.route('/tasks', methods=['GET'])
def get_tasks():
    return get_tasks_controller()

@bp.route('/tasks', methods=['POST'])
def create_task():
    return create_task_controller()

@bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    return update_task_controller(task_id)

@bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    return delete_task_controller(task_id)