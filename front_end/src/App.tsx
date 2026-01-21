/**
 * 메인 App 컴포넌트 - 라우팅 설정
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { ToastContainer } from '@/components/common/ToastContainer';
import { HomePage } from '@/pages/HomePage';
import { ProductListPage } from '@/pages/ProductListPage';
import { StatisticsPage } from '@/pages/StatisticsPage';
import { AboutPage } from '@/pages/AboutPage';
import { isRetryableError } from '@/utils/errorHandler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // 재시도 가능한 에러만 재시도 (최대 2번)
        if (isRetryableError(error) && failureCount < 2) {
          return true;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false, // Mutation은 재시도하지 않음
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ToastContainer>
    </QueryClientProvider>
  );
}

export default App;
