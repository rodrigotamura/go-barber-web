import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form
        initialData={profile} // fill data according to input's name
        onSubmit={handleSubmit}
      >
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="Your e-mail address" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="You current password"
        />
        <Input name="password" type="password" placeholder="You new password" />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Repeat your new password"
        />

        <button type="submit">Update profile</button>
      </Form>

      <button type="button">Remove my account from GoBarber</button>
    </Container>
  );
}
