import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };
            render(<RepositoryListContainer repositories={repositories} />);
            const items = screen.getAllByTestId('repositoryItem');
            const firstItem = items[0];
            const firstNode = repositories.edges[0].node;
            const firstQueries = within(firstItem);
            expect(firstQueries.getByText(firstNode.fullName)).toBeTruthy();
            expect(firstQueries.getByText(firstNode.description)).toBeTruthy();
            expect(firstQueries.getByText(firstNode.language)).toBeTruthy();
            expect(firstQueries.getByText('Forks')).toBeTruthy();
            expect(firstQueries.getByText('1.6k')).toBeTruthy();
            expect(firstQueries.getByText('Stars')).toBeTruthy();
            expect(firstQueries.getByText('21.9k')).toBeTruthy();
            expect(firstQueries.getByText('Rating')).toBeTruthy();
            expect(firstQueries.getByText('88')).toBeTruthy();
            expect(firstQueries.getByText('Reviews')).toBeTruthy();
            expect(firstQueries.getByText('3')).toBeTruthy();
            const secondItem = items[1];
            const secondNode = repositories.edges[1].node;
            const secondQueries = within(secondItem);
            expect(secondQueries.getByText(secondNode.fullName)).toBeTruthy();
            expect(secondQueries.getByText(secondNode.description)).toBeTruthy();
            expect(secondQueries.getByText(secondNode.language)).toBeTruthy();
            expect(secondQueries.getByText('Forks')).toBeTruthy();
            expect(secondQueries.getByText('69')).toBeTruthy();
            expect(secondQueries.getByText('Stars')).toBeTruthy();
            expect(secondQueries.getByText('1.8k')).toBeTruthy();
            expect(secondQueries.getByText('Rating')).toBeTruthy();
            expect(secondQueries.getByText('72')).toBeTruthy();
            expect(secondQueries.getByText('Reviews')).toBeTruthy();
            expect(secondQueries.getByText('3')).toBeTruthy();
        });
    });
});