import { Entity } from '@backstage/catalog-model';
import { useApi } from '@backstage/core-plugin-api';
import { HelmRelease } from '@weaveworks/weave-gitops';
import { useQuery } from 'react-query';
import { fluxApiRef } from '../api';

// Does not work without setting up some id provider
// https://github.com/backstage/backstage/issues/12394
//
// const res = useCustomResources(entity, [
//   {
//     apiVersion: 'v2beta1',
//     group: 'helm.toolkit.fluxcd.io',
//     plural: 'helmreleases',
//   },
// ]);
// console.log('res', res);
//
// So we re-implement the hook here:

export function useQueryHelmRelease(entity: Entity, clusterName: string) {
  const fluxApi = useApi(fluxApiRef);
  const entityName =
    entity.metadata?.annotations?.['backstage.io/kubernetes-id'] ||
    entity.metadata?.name;

  return useQuery<HelmRelease, Error>(
    ['helmrelease', entityName, clusterName],
    async () => {
      return await fluxApi.getHelmReleaseInCluster(clusterName, entity);
    },
    { retry: false, refetchInterval: 5000 },
  );
}
