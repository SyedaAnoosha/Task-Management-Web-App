from flask import jsonify, request
from .services import (
    list_tasks,
    create_task,
    update_task,
    delete_task,
    get_task_by_id,
)

def get_tasks_controller():
    status = request.args.get('status')
    tasks = list_tasks(status=status)
    return jsonify(tasks), 200

def create_task_controller():
    data = request.get_json() or {}
    try:
        task = create_task(data)
        return jsonify(task), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

def update_task_controller(task_id):
    task = get_task_by_id(task_id)
    if not task:
        return jsonify({'error': 'not found'}), 404
    data = request.get_json() or {}
    updated = update_task(task_id, data)
    return jsonify(updated), 200

def delete_task_controller(task_id):
    success = delete_task(task_id)
    if not success:
        return jsonify({'error': 'not found'}), 404
    return jsonify({'result': 'deleted'}), 200