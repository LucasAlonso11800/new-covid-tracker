import { renderWithProviders } from '../../utils/test-utils';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import '@testing-library/jest-dom'
import App from '../../App';
import { ChartCard } from '../../components';
import userEvent from '@testing-library/user-event';

const historicData = [
    {
        date: '2021-03-07',
        states: 56,
        cases: {
            total: {
                value: 100,
                calculated: {
                    population_percent: 101,
                    change_from_prior_day: 102,
                    seven_day_change_percent: 103
                }
            }
        },
        testing: {
            total: {
                value: 200,
                calculated: {
                    population_percent: 20,
                    change_from_prior_day: 20,
                    seven_day_change_percent: 20
                }
            }
        },
        outcomes: {
            hospitalized: {
                currently: {
                    value: 300,
                    calculated: {
                        population_percent: 30,
                        change_from_prior_day: 30,
                        seven_day_change_percent: 30,
                        seven_day_average: 30
                    }
                },
                in_icu: {
                    currently: {
                        value: 300,
                        calculated: {
                            population_percent: 30,
                            change_from_prior_day: 30,
                            seven_day_change_percent: 30,
                            seven_day_average: 30
                        }
                    }
                },
                on_ventilator: {
                    currently: {
                        value: 300,
                        calculated: {
                            population_percent: 30,
                            change_from_prior_day: 30,
                            seven_day_change_percent: 30,
                            seven_day_average: 30
                        }
                    }
                }
            },
            death: {
                total: {
                    value: 400,
                    calculated: {
                        population_percent: 40,
                        change_from_prior_day: 40,
                        seven_day_change_percent: 40,
                        seven_day_average: 40
                    }
                }
            }
        }
    },
    {
        date: '2021-03-06',
        states: 56,
        cases: {
            total: {
                value: 1000,
                calculated: {
                    population_percent: 1001,
                    change_from_prior_day: 1002,
                    seven_day_change_percent: 1003
                }
            }
        },
        testing: {
            total: {
                value: 200,
                calculated: {
                    population_percent: 20,
                    change_from_prior_day: 20,
                    seven_day_change_percent: 20
                }
            }
        },
        outcomes: {
            hospitalized: {
                currently: {
                    value: 300,
                    calculated: {
                        population_percent: 30,
                        change_from_prior_day: 30,
                        seven_day_change_percent: 30,
                        seven_day_average: 30
                    }
                },
                in_icu: {
                    currently: {
                        value: 300,
                        calculated: {
                            population_percent: 30,
                            change_from_prior_day: 30,
                            seven_day_change_percent: 30,
                            seven_day_average: 30
                        }
                    }
                },
                on_ventilator: {
                    currently: {
                        value: 300,
                        calculated: {
                            population_percent: 30,
                            change_from_prior_day: 30,
                            seven_day_change_percent: 30,
                            seven_day_average: 30
                        }
                    }
                }
            },
            death: {
                total: {
                    value: 400,
                    calculated: {
                        population_percent: 40,
                        change_from_prior_day: 40,
                        seven_day_change_percent: 40,
                        seven_day_average: 40
                    }
                }
            }
        }
    }
]

const handlers = [rest.get('https://api.covidtracking.com/v2/us/daily.json', (req, res, ctx) => {
    return res(ctx.json({
        data: historicData
    }));
})];

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Chart card renders data correctly', async () => {
    renderWithProviders(<ChartCard
        color='#000'
        date='2021-03-07'
        keys='cases.total'
        label='Cases'
        title='Cases in the previous months'
    />,
        { preloadedState: { historicData: { data: historicData, loading: false, error: null } } });

    expect(await screen.findByTestId("chart-Cases")).toBeInTheDocument();
    expect(await screen.findByText("Population %")).toBeInTheDocument();
    expect(await screen.findByText(historicData[0].cases.total.calculated.population_percent + "%")).toBeInTheDocument();
    expect(await screen.findByText("Daily change")).toBeInTheDocument();
    expect(await screen.findByText(historicData[0].cases.total.calculated.change_from_prior_day)).toBeInTheDocument();
    expect(await screen.findByText("Weekly change %")).toBeInTheDocument();
    expect(await screen.findByText(historicData[0].cases.total.calculated.seven_day_change_percent + "%")).toBeInTheDocument();
});

test('Chart card rerenders data correctly after date change', async () => {
    renderWithProviders(<App />);

    const chartCases = await screen.findByTestId("chart-Cases");
    const input = await screen.findByTestId("input");
    expect(input).toBeInTheDocument();
    expect(input).not.toBeNull();

    expect(await within(chartCases).findByText("Population %")).toBeInTheDocument();
    expect(await within(chartCases).findByText(historicData[0].cases.total.calculated.population_percent + "%")).toBeInTheDocument();
    expect(await within(chartCases).findByText("Daily change")).toBeInTheDocument();
    expect(await within(chartCases).findByText(historicData[0].cases.total.calculated.change_from_prior_day)).toBeInTheDocument();
    expect(await within(chartCases).findByText("Weekly change %")).toBeInTheDocument();
    expect(await within(chartCases).findByText(historicData[0].cases.total.calculated.seven_day_change_percent + "%")).toBeInTheDocument();
});