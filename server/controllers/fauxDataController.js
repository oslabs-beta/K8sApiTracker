const fauxDataController = {};

fauxDataController.getFauxData = (req, res, next) => {
    // console.log('Inside of getFauxData controller');
    // Push faux data with updates available
    res.locals.clusterData.push(
        {
            name: 'horizontal-pod-auto-scaler',
            kind: 'HorizontalPodAutoscaler',
            apiVersion: 'v2beta1',
            namespace: 'default',
            image: '-',
        },
        {
            name: 'controller-revision',
            kind: 'ControllerRevision',
            apiVersion: 'v1beta2',
            namespace: 'default',
            image: '-',
        },
        {
            name: 'storage-class-list',
            kind: 'StorageClassList',
            apiVersion: 'v1beta1',
            namespace: 'default',
            image: '-',
        },
        {
            name: 'priority-level-config',
            kind: 'PriorityLevelConfiguration',
            apiVersion: 'v1beta1',
            namespace: 'default',
            image: '-',
        },
        {
            name: 'csi-storage-capacity',
            kind: 'CSIStorageCapacity',
            apiVersion: 'v1alpha1',
            namespace: 'default',
            image: '-',
        },
    );

    // Push faux data with no updates available
    res.locals.clusterData.push(
        {
            name: 'horizontal-pod-auto-scaler-list',
            kind: 'HorizontalPodAutoscalerList',
            apiVersion: 'v2beta1',
            namespace: 'default',
            image: '-',
        },
        {
            name: 'cluster-scale',
            kind: 'Scale',
            apiVersion: 'v1beta2',
            namespace: 'default',
            image: '-',
        },
        {
            name: 'cluster-trust-bundle',
            kind: 'ClusterTrustBundle',
            apiVersion: 'v1alpha1',
            namespace: 'default',
            image: '-',
        },
        {
            name: 'validating-admission-policy',
            kind: 'ValidatingAdmissionPolicy',
            apiVersion: 'v1beta1',
            namespace: 'default',
            image: '-',
        },

    );

    return next();
}


module.exports = fauxDataController;
