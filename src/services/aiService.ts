import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { TextAnalyticsClient, AzureKeyCredential } from '@azure/ai-text-analytics';
import { Certificate } from '../store';

// Azure AI Services Configuration
const computerVisionEndpoint = import.meta.env.VITE_AZURE_COMPUTER_VISION_ENDPOINT;
const computerVisionKey = import.meta.env.VITE_AZURE_COMPUTER_VISION_KEY;
const textAnalyticsEndpoint = import.meta.env.VITE_AZURE_TEXT_ANALYTICS_ENDPOINT;
const textAnalyticsKey = import.meta.env.VITE_AZURE_TEXT_ANALYTICS_KEY;

// Initialize Azure AI clients
const computerVisionClient = new ComputerVisionClient(
  new AzureKeyCredential(computerVisionKey),
  computerVisionEndpoint
);

const textAnalyticsClient = new TextAnalyticsClient(
  textAnalyticsEndpoint,
  new AzureKeyCredential(textAnalyticsKey)
);

export class AIService {
  private static instance: AIService;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeCertificateImage(imageUrl: string): Promise<{
    isAuthentic: boolean;
    confidence: number;
    tamperingDetected: boolean;
    details: any;
  }> {
    try {
      // Analyze image for tampering detection
      const [imageAnalysis, readResult] = await Promise.all([
        computerVisionClient.analyzeImage(imageUrl, {
          visualFeatures: ['Brands', 'Objects', 'Tags', 'Description'],
          details: ['Celebrities', 'Landmarks'],
          language: 'en',
        }),
        computerVisionClient.read(imageUrl),
      ]);

      // Extract text from certificate
      const text = readResult.analyzeResult?.readResults
        .map((page) => page.lines.map((line) => line.text).join(' '))
        .join('\n');

      // Analyze text for sentiment and key phrases
      const [sentiment, keyPhrases] = await Promise.all([
        textAnalyticsClient.analyzeSentiment([text]),
        textAnalyticsClient.extractKeyPhrases([text]),
      ]);

      // Perform tampering detection
      const tamperingIndicators = this.detectTampering(imageAnalysis, text);

      // Calculate authenticity score
      const authenticityScore = this.calculateAuthenticityScore(
        imageAnalysis,
        sentiment[0],
        keyPhrases[0],
        tamperingIndicators
      );

      return {
        isAuthentic: authenticityScore > 0.8,
        confidence: authenticityScore,
        tamperingDetected: tamperingIndicators.length > 0,
        details: {
          imageAnalysis,
          sentiment: sentiment[0],
          keyPhrases: keyPhrases[0],
          tamperingIndicators,
        },
      };
    } catch (error) {
      console.error('AI analysis failed:', error);
      throw new Error('Failed to analyze certificate');
    }
  }

  private detectTampering(imageAnalysis: any, text: string): string[] {
    const indicators: string[] = [];

    // Check for image manipulation
    if (imageAnalysis.metadata?.format !== 'JPEG' && imageAnalysis.metadata?.format !== 'PNG') {
      indicators.push('Unusual image format detected');
    }

    // Check for inconsistent text
    if (text.includes('Certificate') && !text.includes('Issued by')) {
      indicators.push('Missing required certificate fields');
    }

    // Add more tampering detection logic here
    // - Check for digital signature consistency
    // - Verify QR code integrity
    // - Analyze image quality and compression artifacts
    // - Check for text overlay inconsistencies

    return indicators;
  }

  private calculateAuthenticityScore(
    imageAnalysis: any,
    sentiment: any,
    keyPhrases: any,
    tamperingIndicators: string[]
  ): number {
    let score = 1.0;

    // Reduce score based on tampering indicators
    score -= tamperingIndicators.length * 0.1;

    // Adjust score based on sentiment
    if (sentiment.sentiment === 'negative') {
      score -= 0.2;
    }

    // Adjust score based on key phrases
    const requiredPhrases = ['Certificate', 'Issued', 'Valid', 'Date'];
    const missingPhrases = requiredPhrases.filter(
      (phrase) => !keyPhrases.keyPhrases.some((kp: string) => kp.includes(phrase))
    );
    score -= missingPhrases.length * 0.05;

    // Ensure score is between 0 and 1
    return Math.max(0, Math.min(1, score));
  }

  async verifyCertificateContent(certificate: Certificate): Promise<{
    isValid: boolean;
    riskScore: number;
    recommendations: string[];
  }> {
    try {
      // Analyze certificate content for potential fraud
      const text = `${certificate.id} ${certificate.claimId} ${certificate.status}`;
      const [sentiment, keyPhrases, entities] = await Promise.all([
        textAnalyticsClient.analyzeSentiment([text]),
        textAnalyticsClient.extractKeyPhrases([text]),
        textAnalyticsClient.recognizeEntities([text]),
      ]);

      // Calculate risk score
      const riskScore = this.calculateRiskScore(sentiment[0], keyPhrases[0], entities[0]);

      // Generate recommendations
      const recommendations = this.generateRecommendations(
        sentiment[0],
        keyPhrases[0],
        entities[0],
        riskScore
      );

      return {
        isValid: riskScore < 0.7,
        riskScore,
        recommendations,
      };
    } catch (error) {
      console.error('Certificate verification failed:', error);
      throw new Error('Failed to verify certificate content');
    }
  }

  private calculateRiskScore(sentiment: any, keyPhrases: any, entities: any): number {
    let score = 0.5; // Start with neutral score

    // Adjust based on sentiment
    if (sentiment.sentiment === 'negative') {
      score += 0.2;
    }

    // Adjust based on missing entities
    const requiredEntities = ['Certificate', 'Date', 'Issuer'];
    const missingEntities = requiredEntities.filter(
      (entity) => !entities.entities.some((e: any) => e.text.includes(entity))
    );
    score += missingEntities.length * 0.1;

    // Ensure score is between 0 and 1
    return Math.max(0, Math.min(1, score));
  }

  private generateRecommendations(
    sentiment: any,
    keyPhrases: any,
    entities: any,
    riskScore: number
  ): string[] {
    const recommendations: string[] = [];

    if (riskScore > 0.7) {
      recommendations.push('High risk detected: Additional verification required');
    }

    if (sentiment.sentiment === 'negative') {
      recommendations.push('Review certificate content for inconsistencies');
    }

    // Add more specific recommendations based on analysis
    if (!entities.entities.some((e: any) => e.text.includes('Certificate'))) {
      recommendations.push('Verify certificate format and structure');
    }

    return recommendations;
  }

  async classifyDocument(imageUrl: string): Promise<{
    documentType: string;
    confidence: number;
    metadata: any;
  }> {
    try {
      const [imageAnalysis, readResult] = await Promise.all([
        computerVisionClient.analyzeImage(imageUrl, {
          visualFeatures: ['Tags', 'Description', 'Categories'],
          details: ['Landmarks'],
          language: 'en',
        }),
        computerVisionClient.read(imageUrl),
      ]);

      // Extract document type based on visual features and text
      const documentType = this.determineDocumentType(imageAnalysis, readResult);
      const confidence = this.calculateClassificationConfidence(imageAnalysis, readResult);

      return {
        documentType,
        confidence,
        metadata: {
          tags: imageAnalysis.tags,
          categories: imageAnalysis.categories,
          description: imageAnalysis.description,
        },
      };
    } catch (error) {
      console.error('Document classification failed:', error);
      throw new Error('Failed to classify document');
    }
  }

  private determineDocumentType(imageAnalysis: any, readResult: any): string {
    const text = readResult.analyzeResult?.readResults
      .map((page: any) => page.lines.map((line: any) => line.text).join(' '))
      .join('\n');

    // Document type detection logic
    if (text.includes('Certificate of Insurance')) return 'Insurance Certificate';
    if (text.includes('Certificate of Completion')) return 'Completion Certificate';
    if (text.includes('Certificate of Authenticity')) return 'Authenticity Certificate';
    if (text.includes('Certificate of Origin')) return 'Origin Certificate';
    
    // Fallback to AI-based classification
    const tags = imageAnalysis.tags.map((tag: any) => tag.name);
    if (tags.includes('certificate')) return 'Generic Certificate';
    if (tags.includes('document')) return 'Generic Document';
    
    return 'Unknown Document Type';
  }

  private calculateClassificationConfidence(imageAnalysis: any, readResult: any): number {
    let confidence = 0.5; // Base confidence

    // Adjust based on tag confidence
    const relevantTags = imageAnalysis.tags.filter((tag: any) => 
      ['certificate', 'document', 'official'].includes(tag.name.toLowerCase())
    );
    confidence += relevantTags.reduce((sum: number, tag: any) => sum + tag.confidence, 0) / 3;

    // Adjust based on text quality
    const textQuality = readResult.analyzeResult?.readResults[0]?.confidence || 0;
    confidence = (confidence + textQuality) / 2;

    return Math.min(1, Math.max(0, confidence));
  }

  async detectAnomalies(certificate: Certificate): Promise<{
    anomalies: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      confidence: number;
    }>;
    riskLevel: 'low' | 'medium' | 'high';
  }> {
    try {
      const anomalies: Array<{
        type: string;
        severity: 'low' | 'medium' | 'high';
        description: string;
        confidence: number;
      }> = [];

      // Check for temporal anomalies
      const temporalAnomalies = this.detectTemporalAnomalies(certificate);
      anomalies.push(...temporalAnomalies);

      // Check for content anomalies
      const contentAnomalies = await this.detectContentAnomalies(certificate);
      anomalies.push(...contentAnomalies);

      // Check for structural anomalies
      const structuralAnomalies = this.detectStructuralAnomalies(certificate);
      anomalies.push(...structuralAnomalies);

      // Calculate overall risk level
      const riskLevel = this.calculateRiskLevel(anomalies);

      return {
        anomalies,
        riskLevel,
      };
    } catch (error) {
      console.error('Anomaly detection failed:', error);
      throw new Error('Failed to detect anomalies');
    }
  }

  private detectTemporalAnomalies(certificate: Certificate): Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    confidence: number;
  }> {
    const anomalies = [];
    const now = new Date().getTime();
    const issueDate = new Date(certificate.issueDate).getTime();
    const expiryDate = new Date(certificate.expiryDate).getTime();

    // Check for future-dated certificates
    if (issueDate > now) {
      anomalies.push({
        type: 'temporal',
        severity: 'high',
        description: 'Certificate is dated in the future',
        confidence: 0.95,
      });
    }

    // Check for expired certificates
    if (expiryDate < now) {
      anomalies.push({
        type: 'temporal',
        severity: 'medium',
        description: 'Certificate has expired',
        confidence: 0.9,
      });
    }

    // Check for unusually long validity periods
    const validityPeriod = expiryDate - issueDate;
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    if (validityPeriod > oneYear * 5) {
      anomalies.push({
        type: 'temporal',
        severity: 'medium',
        description: 'Unusually long certificate validity period',
        confidence: 0.8,
      });
    }

    return anomalies;
  }

  private async detectContentAnomalies(certificate: Certificate): Promise<Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    confidence: number;
  }>> {
    const anomalies = [];
    const text = `${certificate.id} ${certificate.claimId} ${certificate.status}`;

    // Analyze text for inconsistencies
    const [sentiment, entities] = await Promise.all([
      textAnalyticsClient.analyzeSentiment([text]),
      textAnalyticsClient.recognizeEntities([text]),
    ]);

    // Check for negative sentiment in certificate content
    if (sentiment[0].sentiment === 'negative') {
      anomalies.push({
        type: 'content',
        severity: 'medium',
        description: 'Negative sentiment detected in certificate content',
        confidence: 0.85,
      });
    }

    // Check for missing required entities
    const requiredEntities = ['Certificate', 'Date', 'Issuer'];
    const missingEntities = requiredEntities.filter(
      (entity) => !entities[0].entities.some((e: any) => e.text.includes(entity))
    );

    if (missingEntities.length > 0) {
      anomalies.push({
        type: 'content',
        severity: 'high',
        description: `Missing required entities: ${missingEntities.join(', ')}`,
        confidence: 0.9,
      });
    }

    return anomalies;
  }

  private detectStructuralAnomalies(certificate: Certificate): Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    confidence: number;
  }> {
    const anomalies = [];

    // Check for invalid certificate ID format
    if (!/^CERT-\d{6}$/.test(certificate.id)) {
      anomalies.push({
        type: 'structural',
        severity: 'high',
        description: 'Invalid certificate ID format',
        confidence: 0.95,
      });
    }

    // Check for missing seal
    if (!certificate.seal) {
      anomalies.push({
        type: 'structural',
        severity: 'high',
        description: 'Missing certificate seal',
        confidence: 0.9,
      });
    }

    // Check for invalid status
    const validStatuses = ['valid', 'expired', 'revoked'];
    if (!validStatuses.includes(certificate.status.toLowerCase())) {
      anomalies.push({
        type: 'structural',
        severity: 'medium',
        description: 'Invalid certificate status',
        confidence: 0.85,
      });
    }

    return anomalies;
  }

  private calculateRiskLevel(anomalies: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    confidence: number;
  }>): 'low' | 'medium' | 'high' {
    const severityScores = {
      low: 1,
      medium: 2,
      high: 3,
    };

    const totalScore = anomalies.reduce(
      (sum, anomaly) => sum + severityScores[anomaly.severity] * anomaly.confidence,
      0
    );

    if (totalScore >= 5) return 'high';
    if (totalScore >= 3) return 'medium';
    return 'low';
  }
}

// Export singleton instance
export const aiService = AIService.getInstance(); 