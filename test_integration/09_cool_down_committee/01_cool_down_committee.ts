// Copyright 2019 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

import chai = require('chai');

const {assert} = chai;
import shared from "../shared";
import Utils, {NULL_ADDRESS} from "../Utils";

describe('Committee::cooldownCommittee', async () => {

  it('should cool down Committee',  async () => {

    const validators = shared.origin.keys.validators;
    const committee = shared.origin.contracts.Committee.instance;
    let member;
    for (let i = 0; i < validators.length; i++) {
      const possibleMember = await committee.methods.members(validators[0].address).call();

      if (possibleMember != NULL_ADDRESS) {
        member = possibleMember;
        break;
      }
    }

    assert.isOk(
      member !== undefined,
      'Atleast one member should be added to committee',
    );

    await Utils.sendTransaction(
      committee.methods.cooldownCommittee(),
      {from: member},
    );

  });
});

