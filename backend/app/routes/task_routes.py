from flask import Blueprint

from ..controllers.task_controllers import (
    get_tasks_controller,
    create_task_controller,
    update_task_controller,
    delete_task_controller,
)

task_routes = Blueprint('task_routes', __name__)

@task_routes.route('/tasks', methods=['GET'])
def get_tasks():
    return get_tasks_controller()

@task_routes.route('/tasks', methods=['POST'])
def create_task():
    return create_task_controller()

@task_routes.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    return update_task_controller(task_id)

@task_routes.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    return delete_task_controller(task_id)