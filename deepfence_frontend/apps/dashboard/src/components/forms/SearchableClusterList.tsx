import { useSuspenseInfiniteQuery } from '@suspensive/react-query';
import { debounce } from 'lodash-es';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { CircleSpinner, Combobox, ComboboxOption } from 'ui-components';

import { queries } from '@/queries';

const PAGE_SIZE = 15;
type SearchableClusterListProps = {
  onChange?: (value: string[]) => void;
  onClearAll?: () => void;
  defaultSelectedClusters?: string[];
  valueKey?: 'nodeId' | 'nodeName';
  active?: boolean;
  triggerVariant?: 'select' | 'button';
  helperText?: string;
  color?: 'error' | 'default';
};

const SearchableCluster = ({
  onChange,
  onClearAll,
  defaultSelectedClusters,
  valueKey = 'nodeId',
  active,
  triggerVariant,
  helperText,
  color,
}: SearchableClusterListProps) => {
  const [searchText, setSearchText] = useState('');

  const [selectedClusters, setSelectedClusters] = useState<string[]>(
    defaultSelectedClusters ?? [],
  );

  const isSelectVariantType = useMemo(() => {
    return triggerVariant === 'select';
  }, [triggerVariant]);

  useEffect(() => {
    setSelectedClusters(defaultSelectedClusters ?? []);
  }, [defaultSelectedClusters]);

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      ...queries.search.clusters({
        size: PAGE_SIZE,
        searchText,
        active,
        agentRunning: true,
        order: {
          sortBy: 'node_name',
          descending: false,
        },
      }),
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length * PAGE_SIZE;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        if (!allPages.length) return 0;
        return (allPages.length - 1) * PAGE_SIZE;
      },
    });

  const searchCluster = debounce((query) => {
    setSearchText(query);
  }, 1000);

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
      <input
        type="text"
        name="selectedClusterLength"
        hidden
        readOnly
        value={selectedClusters.length}
      />
      <Combobox
        startIcon={
          isFetchingNextPage ? <CircleSpinner size="sm" className="w-3 h-3" /> : undefined
        }
        name="clusterFilter"
        triggerVariant={triggerVariant || 'button'}
        label={isSelectVariantType ? 'Cluster' : undefined}
        getDisplayValue={() =>
          isSelectVariantType && selectedClusters.length > 0
            ? `${selectedClusters.length} selected`
            : null
        }
        placeholder="Select cluster"
        multiple
        value={selectedClusters}
        onChange={(values) => {
          setSelectedClusters(values);
          onChange?.(values);
        }}
        onQueryChange={searchCluster}
        clearAllElement="Clear"
        onClearAll={onClearAll}
        onEndReached={onEndReached}
        helperText={helperText}
        color={color}
      >
        {data?.pages
          .flatMap((page) => {
            return page.clusters;
          })
          .map((cluster, index) => {
            return (
              <ComboboxOption
                key={`${cluster.nodeId}-${index}`}
                value={cluster[valueKey]}
              >
                {cluster.nodeName}
              </ComboboxOption>
            );
          })}
      </Combobox>
    </>
  );
};

export const SearchableClusterList = (props: SearchableClusterListProps) => {
  const { triggerVariant } = props;
  const isSelectVariantType = useMemo(() => {
    return triggerVariant === 'select';
  }, [triggerVariant]);

  return (
    <Suspense
      fallback={
        <Combobox
          label={isSelectVariantType ? 'Cluster' : undefined}
          triggerVariant={triggerVariant || 'button'}
          startIcon={<CircleSpinner size="sm" className="w-3 h-3" />}
          placeholder="Select cluster"
          multiple
          onQueryChange={() => {
            // no operation
          }}
        />
      }
    >
      <SearchableCluster {...props} />
    </Suspense>
  );
};
