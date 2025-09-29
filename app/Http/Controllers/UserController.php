<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\PaginateRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Resources\JobPositionResource;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use App\Services\PasswordService;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @group User
 *
 * APIs for User module
 */
class UserController extends Controller
{
    protected $repository;

    protected $passwordService;

    public function __construct(UserRepository $repository, PasswordService $passwordService)
    {
        $this->repository = $repository;
        $this->passwordService = $passwordService;
    }

    /**
     * GET list of users
     *
     * @queryParam limit int
     * @queryParam page int
     * @queryParam search string Search data by name, email or phone_number
     * @queryParam sort_column string Target sort column: name, email, phone_number. Example: created_at
     * @queryParam sort_order string Sort type asc or desc. Example: desc
     */
    public function paginate(PaginateRequest $request)
    {
        $filter = $request->validated();

        $users = $this->repository->fetchList($filter);

        $limit = (int) ($filter['limit'] ?? 10);
        if ($limit !== -1) {
            $users = $users->paginate(
                $limit,
                $filter['page'] ?? 1
            );
        } else {
            $users = $users->get();
        }

        return apiResponse(
            Response::HTTP_OK,
            'Fetch users list successful',
            UserResource::collection($users)
        );
    }

    /**
     * Create user
     *
     * @bodyParam name required The name of the user.
     * @bodyParam email required unique The email of the user.
     * @bodyParam phone_number required The phone number of the user.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $data['image'] = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('users/profile_photo');
            $data['image'] = $path;
        }

        $user = $this->repository->store($data);

        return apiResponse(
            Response::HTTP_OK,
            'Create user successful',
            UserResource::make($user)
        );
    }

    /**
     * Get user entry related data
     */
    public function get_entry_related_data()
    {
        $data = $this->repository->entryRelatedData();

        $data['job_positions'] = JobPositionResource::collection($data['job_positions']);

        return apiResponse(
            Response::HTTP_OK,
            'Fetch user successful',
            JsonResource::make($data)
        );
    }

    /**
     * Get user details
     *
     * @urlParam id required The ID of the user.
     */
    public function show(int $id)
    {
        $user = $this->repository->findByID($id);

        return apiResponse(
            Response::HTTP_OK,
            'Fetch user successful',
            UserResource::make($user)
        );
    }

    /**
     * Update user
     *
     * @urlParam id required The ID of the user.
     *
     * @bodyParam name required The name of the user.
     * @bodyParam email required unique The email of the user.
     * @bodyParam phone_number required The phone number of the user.
     */
    public function update(int $id, StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['password'])) {
            if (! isset($data['password_confirmation'])) {
                $data['password_confirmation'] = '';
            }
            $this->passwordService->validate($id, $data['password'], $data['password_confirmation']);
            $data['latest_updated_password'] = now();
        }

        $data['image'] = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('users/profile_photo');
            $data['image'] = $path;
        }

        $user = $this->repository->update($id, $data);

        if (isset($data['password'])) {
            $this->passwordService->storePasswordHistory($user->id, $data['password']);
        }

        return apiResponse(
            Response::HTTP_OK,
            'Update user successful',
            UserResource::make($user)
        );
    }

    /**
     * Delete user
     *
     * @urlParam id required The ID of the user.
     */
    public function destroy(int $id)
    {
        $this->repository->destroy($id);

        return apiResponse(Response::HTTP_NO_CONTENT, 'Delete user successful');
    }

    /**
     * Delete user
     *
     * @urlParam id required The ID of the user.
     * @urlParam active required The active status of the user.
     */
    public function update_user_status(int $id, bool $active)
    {
        $this->repository->updateActiveStatus($id, $active);

        return apiResponse(Response::HTTP_NO_CONTENT, 'User updated');
    }

    /**
     * Delete user
     *
     * @urlParam id required The ID of the user.
     */
    public function unblock_user(int $id)
    {
        $this->repository->unblock($id);

        return apiResponse(Response::HTTP_NO_CONTENT, 'User unblocked');
    }

    public function forgot_password(FormRequest $request)
    {
        $status = $this->repository->forgotPassword($request->id);

        if($status == Password::RESET_LINK_SENT || $status === Password::RESET_THROTTLED) {
            return api_response()->success();
        }

        return api_response()->error(['error' => $status], 400, 'Error');
    }
}
