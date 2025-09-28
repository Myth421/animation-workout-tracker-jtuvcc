
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { supabase } from '@/app/integrations/supabase/client';

const { width } = Dimensions.get('window');

interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

interface ImageGenerationResponse {
  success: boolean;
  images: GeneratedImage[];
  prompt: string;
  seed: number;
  timings: {
    inference: number;
  };
  error?: string;
  details?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateButtonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 12,
  },
  imageContainer: {
    marginBottom: 24,
  },
  generatedImage: {
    width: width - 40,
    height: width - 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  imageInfo: {
    marginTop: 12,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
  },
  promptText: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
    marginTop: 8,
  },
  examplePrompts: {
    marginBottom: 24,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  examplePrompt: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  examplePromptText: {
    fontSize: 14,
    color: colors.text,
  },
});

const examplePrompts = [
  "A futuristic gym with holographic workout equipment and neon lighting",
  "A person doing yoga on a mountain peak at sunrise, peaceful and serene",
  "An athletic woman lifting weights in a modern minimalist gym",
  "A runner on a forest trail with sunlight filtering through trees",
  "A group fitness class in a bright, airy studio with large windows"
];

export default function ImageGeneratorScreen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [imageInfo, setImageInfo] = useState<{
    prompt: string;
    seed: number;
    timings: { inference: number };
  } | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt to generate an image');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setImageInfo(null);

    try {
      console.log('Generating image with prompt:', prompt);
      
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: {
          prompt: prompt.trim(),
          image_size: 'square_hd',
          num_inference_steps: 28,
          guidance_scale: 3.5,
          num_images: 1
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        Alert.alert('Error', `Failed to generate image: ${error.message}`);
        return;
      }

      const response = data as ImageGenerationResponse;
      
      if (!response.success || response.error) {
        console.error('Image generation error:', response.error, response.details);
        Alert.alert('Error', response.error || 'Failed to generate image');
        return;
      }

      if (response.images && response.images.length > 0) {
        setGeneratedImage(response.images[0]);
        setImageInfo({
          prompt: response.prompt,
          seed: response.seed,
          timings: response.timings
        });
        console.log('Image generated successfully:', response.images[0].url);
      } else {
        Alert.alert('Error', 'No images were generated');
      }

    } catch (error) {
      console.error('Error generating image:', error);
      Alert.alert('Error', 'An unexpected error occurred while generating the image');
    } finally {
      setIsGenerating(false);
    }
  };

  const selectExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.back()}
      style={({ pressed }) => [
        commonStyles.headerButton,
        { opacity: pressed ? 0.7 : 1 }
      ]}
    >
      <IconSymbol name="xmark" size={20} color={colors.text} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'AI Image Generator',
          headerRight: renderHeaderRight,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Generate Images</Text>
          <Text style={styles.subtitle}>
            Create custom workout and fitness images using AI. Describe what you want to see and let AI bring it to life.
          </Text>

          <View style={styles.examplePrompts}>
            <Text style={styles.exampleTitle}>Example Prompts</Text>
            {examplePrompts.map((examplePrompt, index) => (
              <Pressable
                key={index}
                style={styles.examplePrompt}
                onPress={() => selectExamplePrompt(examplePrompt)}
              >
                <Text style={styles.examplePromptText}>{examplePrompt}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Image Description</Text>
            <TextInput
              style={styles.textInput}
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Describe the image you want to generate..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
            />
          </View>

          <Pressable
            style={[
              styles.generateButton,
              (isGenerating || !prompt.trim()) && styles.generateButtonDisabled
            ]}
            onPress={generateImage}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.generateButtonText}>Generate Image</Text>
            )}
          </Pressable>

          {isGenerating && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Generating your image...</Text>
            </View>
          )}

          {generatedImage && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: generatedImage.url }}
                style={styles.generatedImage}
                resizeMode="cover"
              />
              
              {imageInfo && (
                <View style={styles.imageInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Size</Text>
                    <Text style={styles.infoValue}>
                      {generatedImage.width} × {generatedImage.height}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Generation Time</Text>
                    <Text style={styles.infoValue}>
                      {imageInfo.timings.inference.toFixed(2)}s
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Seed</Text>
                    <Text style={styles.infoValue}>{imageInfo.seed}</Text>
                  </View>
                  <Text style={styles.promptText}>"{imageInfo.prompt}"</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
