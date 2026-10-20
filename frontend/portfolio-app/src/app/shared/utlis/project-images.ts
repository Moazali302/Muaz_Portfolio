import { Project } from '../../guards/services/api.service';

/** The images to show for a project: its `images` list, or the single cover image as a fallback. */
export function projectImages(project: Project): string[] {
  if (project.images?.length) {
    return project.images;
  }
  return project.coverImage ? [project.coverImage] : [];
}