import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Button, Card, Heading, MenuItem, Text } from "tw-components";
import React, { useEffect, useMemo, useState } from "react";
import {
  ApiKey,
  useApiKeys,
  useWalletStats,
} from "@3rdweb-sdk/react/hooks/useApi";
import { ChartContainer } from "components/analytics/chart-container";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";
import {
  AutoBarChart,
  BAR_COLORS_DARK,
  BAR_COLORS_LIGHT,
} from "components/analytics/auto-bar-chart";
import { FiChevronDown } from "react-icons/fi";
import { shortenString } from "utils/usedapp-external";
import { useAddress } from "@thirdweb-dev/react";

const RADIAN = Math.PI / 180;

const DashboardWalletsAnalytics: ThirdwebNextPage = () => {
  const { colorMode } = useColorMode();
  const barColors = useMemo(() => {
    if (colorMode === "light") {
      return BAR_COLORS_LIGHT;
    }

    return BAR_COLORS_DARK;
  }, [colorMode]);
  const address = useAddress();
  const keysQuery = useApiKeys();
  const [selectedKey, setSelectedKey] = useState<undefined | ApiKey>();
  useEffect(() => {
    if (selectedKey) {
      return;
    }
    if (keysQuery.data && keysQuery.data?.length > 0) {
      setSelectedKey(keysQuery.data?.[0]);
    } else {
      setSelectedKey(undefined);
    }
  }, [keysQuery.data, selectedKey]);
  const statsQuery = useWalletStats(selectedKey?.key);
  const pieChartData = useMemo(() => {
    return statsQuery.data
      ? Object.values(
          statsQuery.data.timeSeries.reduce(
            (acc, curr) => {
              if (!acc[curr.walletType]) {
                acc[curr.walletType] = {
                  walletType: curr.walletType,
                  totalWallets: curr.totalWallets,
                };
              } else {
                acc[curr.walletType].totalWallets += curr.totalWallets;
              }
              return acc;
            },
            {} as Record<string, { walletType: string; totalWallets: number }>,
          ),
        )
      : [];
  }, [statsQuery.data]);
  const barChartData = useMemo(() => {
    return statsQuery.data
      ? Object.values(
          statsQuery.data.timeSeries.reduce(
            (acc, curr) => {
              if (!acc[curr.dayTime]) {
                acc[curr.dayTime] = {
                  time: new Date(curr.dayTime).getTime(),
                  totalWallets: curr.totalWallets,
                  uniqueWallets: curr.uniqueWallets,
                };
              } else {
                acc[curr.dayTime].totalWallets += curr.totalWallets;
                acc[curr.dayTime].uniqueWallets += curr.uniqueWallets;
              }
              return acc;
            },
            {} as Record<
              string,
              { time: number; totalWallets: number; uniqueWallets: number }
            >,
          ),
        )
      : [];
  }, [statsQuery.data]);
  const walletBarChartData = useMemo(() => {
    return statsQuery.data
      ? Object.values(
          statsQuery.data.timeSeries.reduce(
            (acc, curr) => {
              if (!acc[curr.dayTime]) {
                acc[curr.dayTime] = {
                  time: new Date(curr.dayTime).getTime(),
                  [curr.walletType]: curr.totalWallets,
                };
              } else {
                acc[curr.dayTime][curr.walletType] = curr.totalWallets;
              }
              return acc;
            },
            {} as Record<string, any>,
          ),
        )
      : [];
  }, [statsQuery.data]);

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
      walletType,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          strokeWidth={2}
          stroke={"var(--chakra-colors-backgroundHighlight)"}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="var(--chakra-colors-heading)"
        >{`${walletType}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="var(--chakra-colors-paragraph)"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Flex flexDir="column" gap={10} mt={{ base: 2, md: 6 }}>
      <Flex flexDir="column" gap={2}>
        <Heading size="title.lg" as="h1">
          Connect Analytics
        </Heading>
        <Text>Visualize how users are connecting to your apps</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        flexDir={{ base: "column", lg: "row" }}
        gap={4}
      >
        {address && keysQuery.data && selectedKey && (
          <Menu>
            {({ isOpen }) => (
              <>
                <Flex
                  w="full"
                  alignItems={{ base: "flex-start", lg: "center" }}
                  gap={1}
                  flexDir={{ base: "column", lg: "row" }}
                >
                  <Text minW={32}>Select a Client ID:</Text>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={<FiChevronDown />}
                    variant="outline"
                    minW={60}
                  >
                    <Flex gap={2} alignItems="center">
                      <Heading size="label.md" isTruncated>
                        {selectedKey.name}
                      </Heading>
                      <Text isTruncated>
                        ({shortenString(selectedKey.key)})
                      </Text>
                    </Flex>
                  </MenuButton>
                </Flex>
                <MenuList>
                  {keysQuery.data.map((apiKey) => (
                    <MenuItem
                      key={apiKey.id}
                      value={apiKey.key}
                      onClick={() => setSelectedKey(apiKey)}
                    >
                      {apiKey.name} ({shortenString(apiKey.key)})
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        )}
      </Flex>
      <Flex flexDir="column" gap={8}>
        {statsQuery.data && statsQuery.data.timeSeries.length > 0 ? (
          <>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0} padding={6}>
                <Heading as="h3" size="subtitle.sm">
                  Users Connected
                </Heading>
                <Text>
                  Total and unique wallets addresses that connected to your app.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={21 / 9}>
                <AutoBarChart
                  data={barChartData}
                  showXAxis
                  showYAxis
                  index={{
                    id: "time",
                  }}
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0} padding={6}>
                <Heading as="h3" size="subtitle.sm">
                  Wallet Connectors
                </Heading>
                <Text>
                  The different types of wallets used to connect to your app.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={21 / 9}>
                <AutoBarChart
                  data={walletBarChartData}
                  showXAxis
                  showYAxis
                  index={{
                    id: "time",
                  }}
                  stacked
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0} padding={6}>
                <Heading as="h3" size="subtitle.sm">
                  Wallet Distribution
                </Heading>
                <Text>
                  Distribution of wallet types used to connect to your app.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={21 / 9}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={onPieEnter}
                      data={pieChartData}
                      cx={"50%"}
                      cy={"45%"}
                      dataKey="totalWallets"
                      valueKey="walletType"
                      nameKey="walletType"
                      strokeWidth={2}
                      stroke={"var(--chakra-colors-backgroundHighlight)"}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={barColors[index % barColors.length]}
                        />
                      ))}
                    </Pie>
                    <Legend layout="radial" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Flex>
          </>
        ) : (
          <Stack>
            <Heading as="h3" size="subtitle.sm">
              No data found for this Client ID.
            </Heading>
            <Text>
              Make sure you are running the latest version of the SDK with
              wallet analytics enabled.
            </Text>
          </Stack>
        )}
      </Flex>
    </Flex>
  );
};

DashboardWalletsAnalytics.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <WalletsSidebar activePage="analytics" />
    {page}
  </AppLayout>
);

DashboardWalletsAnalytics.pageId = PageId.DashboardWalletsAnalytics;

export default DashboardWalletsAnalytics;
