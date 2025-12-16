"use client";

import {
  ArrowLeftIcon,
  ShareNetworkIcon,
  ClockIcon,
  CookingPotIcon,
  MagicWandIcon,
} from "@phosphor-icons/react";

// Adjust these paths to match your folder structure
import { Button } from "@/components/Button";
import { Stack } from "@/components/Stack";
import {
  RecipeTitle,
  MetaLabel,
  SectionLabel,
  BodyText,
} from "@/components/Typography";

export default function RecipePage() {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 16,
      }}
    >
      {/* 1. Navbar */}
      <Stack
        direction="row"
        align="center"
        style={{ justifyContent: "space-between", marginBottom: 20 }}
      >
        <Button
          variant="ghost"
          size="sm"
          startIcon={<ArrowLeftIcon size={18} />}
        >
          Back
        </Button>
        <Button
          variant="ghost"
          size="sm"
          startIcon={<ShareNetworkIcon size={18} />}
        >
          Share
        </Button>
      </Stack>

      {/* 2. Hero Image */}
      <img
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
        alt="Recipe"
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderRadius: 12,
          marginBottom: 16,
        }}
      />

      <Stack gap="lg">
        {/* 3. Title & Meta */}
        <Stack gap="xs">
          <RecipeTitle>Super Green Pasta</RecipeTitle>
          <Stack direction="row" gap="md" align="center">
            <Stack direction="row" gap="xs" align="center">
              <ClockIcon size={16} color="#9ea5b0" />
              <MetaLabel>20m Total</MetaLabel>
            </Stack>
            <MetaLabel>•</MetaLabel>
            <MetaLabel>Healthy</MetaLabel>
          </Stack>
        </Stack>

        {/* 4. Primary Actions */}
        <Stack gap="md">
          <Button
            fullWidth
            variant="primary"
            size="lg"
            startIcon={<CookingPotIcon weight="fill" size={20} />}
          >
            Start Cooking
          </Button>
          <Button
            fullWidth
            variant="secondary"
            startIcon={<MagicWandIcon weight="duotone" size={20} />}
          >
            Adjust with AI
          </Button>
        </Stack>

        {/* 5. Description */}
        <Stack gap="sm">
          <SectionLabel>Description</SectionLabel>
          <BodyText>
            A vibrant, nutrient-packed pasta dish that comes together in under
            20 minutes. The sauce is creamy without any heavy cream, using
            spinach and cashews instead.
          </BodyText>
        </Stack>
      </Stack>
    </div>
  );
}
