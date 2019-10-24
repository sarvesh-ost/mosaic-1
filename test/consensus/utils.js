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

const SentinelCommittee = '0x0000000000000000000000000000000000000001';
const CommitteeFormationDelay = 14;
const CommitteeFormationLength = 7;

const CoreStatus = {
  undefined: 0,
  creation: 1,
  opened: 2,
  precommitted: 3,
  halted: 4,
  corrupted: 5,
};
Object.freeze(CoreStatus);

async function setup(consensus, setupConfig) {

  return consensus.setup(
    setupConfig.committeeSize,
    setupConfig.minValidators,
    setupConfig.joinLimit,
    setupConfig.gasTargetDelta,
    setupConfig.coinbaseSplitPerMille,
    setupConfig.reputation,
    setupConfig.txOptions,
  );
}

module.exports = {
  SentinelCommittee,
  CommitteeFormationDelay,
  CommitteeFormationLength,
  CoreStatus,
  setup,
};
