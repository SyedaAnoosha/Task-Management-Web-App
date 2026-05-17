from flask import jsonify, request
from ..services.task_services import (
    list_tasks,
    create_task,
    update_task,
    delete_task,
    get_task_by_id,
)
from flask_jwt_extended import jwt_required, get_jwt_identity


@jwt_required()
def get_tasks_controller():
    status = request.args.get('status')
    q = request.args.get('q')
    user_id = int(get_jwt_identity())
    tasks = list_tasks(user_id=user_id, status=status, q=q)
    return jsonify(tasks), 200


@jwt_required()
def create_task_controller():
    data = request.get_json() or {}
    user_id = int(get_jwt_identity())
    try:
        task = create_task(data, user_id=user_id)
        return jsonify(task), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@jwt_required()
def update_task_controller(task_id):
    user_id = int(get_jwt_identity())
    task = get_task_by_id(task_id, user_id=user_id)
    if not task:
        return jsonify({'error': 'not found'}), 404
    data = request.get_json() or {}
    updated = update_task(task_id, data, user_id=user_id)
    return jsonify(updated), 200


@jwt_required()
def delete_task_controller(task_id):
    user_id = int(get_jwt_identity())
    success = delete_task(task_id, user_id=user_id)
    if not success:
        return jsonify({'error': 'not found'}), 404
    return jsonify({'result': 'deleted'}), 200